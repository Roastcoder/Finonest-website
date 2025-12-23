import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting demo user seed process...");

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Create admin client with service role key
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    const demoEmail = "demo@finonest.com";
    const demoPassword = "demo123";

    // Check if user already exists
    const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (listError) {
      console.error("Error listing users:", listError);
      throw listError;
    }

    const existingUser = existingUsers.users.find(u => u.email === demoEmail);

    if (existingUser) {
      console.log("Demo user already exists, checking admin role...");
      
      // Check if user has admin role
      const { data: roleData, error: roleCheckError } = await supabaseAdmin
        .from('user_roles')
        .select('role')
        .eq('user_id', existingUser.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (roleCheckError) {
        console.error("Error checking role:", roleCheckError);
      }

      if (!roleData) {
        // Add admin role
        const { error: roleError } = await supabaseAdmin
          .from('user_roles')
          .insert({ user_id: existingUser.id, role: 'admin' });

        if (roleError) {
          console.error("Error adding admin role:", roleError);
          throw roleError;
        }
        console.log("Admin role added to existing demo user");
      } else {
        console.log("Demo user already has admin role");
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Demo admin user already exists",
          email: demoEmail
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create new demo user
    console.log("Creating new demo user...");
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: demoEmail,
      password: demoPassword,
      email_confirm: true,
      user_metadata: {
        full_name: "Demo Admin"
      }
    });

    if (createError) {
      console.error("Error creating user:", createError);
      throw createError;
    }

    console.log("Demo user created successfully:", newUser.user.id);

    // Add admin role (the trigger will add 'user' role, we need to add 'admin')
    const { error: adminRoleError } = await supabaseAdmin
      .from('user_roles')
      .insert({ user_id: newUser.user.id, role: 'admin' });

    if (adminRoleError) {
      console.error("Error adding admin role:", adminRoleError);
      throw adminRoleError;
    }

    console.log("Admin role added successfully");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Demo admin user created successfully",
        email: demoEmail
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error("Error in seed-demo-user:", error);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
