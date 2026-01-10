import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/finonest');

const pageSchema = new mongoose.Schema({
  slug: String,
  title: String,
  template: String,
  blocks: Array,
  status: String,
  seo: Object
}, { timestamps: true });

const Page = mongoose.model('Page', pageSchema);

async function checkAboutPage() {
  try {
    const aboutPage = await Page.findOne({ slug: '/about' });
    if (aboutPage) {
      console.log('✅ About page found in database:');
      console.log('Title:', aboutPage.title);
      console.log('Blocks:', aboutPage.blocks.length);
      console.log('Status:', aboutPage.status);
      console.log('\nPage data:', JSON.stringify(aboutPage, null, 2));
    } else {
      console.log('❌ About page not found in database');
    }
    process.exit(0);
  } catch (error) {
    console.error('❌ Database error:', error);
    process.exit(1);
  }
}

checkAboutPage();