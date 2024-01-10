// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const FIREBASE_USER_EMAIL = process.env.FIREBASE_USER_EMAIL
const FIREBASE_USER_PASSWORD = process.env.FIREBASE_USER_PASSWORD
const FIREBASE_COLLECTION_NAME = process.env.FIREBASE_COLLECTION_NAME

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

signInWithEmailAndPassword(auth, FIREBASE_USER_EMAIL ?? '', FIREBASE_USER_PASSWORD ?? '')
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

const db = getFirestore(app);

export const addToFirestore = async (data: any) => {
    try {
        const docRef = await addDoc(collection(db, FIREBASE_COLLECTION_NAME ?? ''), data);
        return {
          success: true,
          message: `Document written with ID: ${docRef.id}`,
          docId: docRef.id
        };
    } catch (e) {
        return {
          success: false,
          message: `Error adding document: ${e}`,
          docId: null
      };
    }
}

const getAllDocsFromFirebaseByCollectionString = async (collectionString: string) => {
  const collection1 = collection(db, collectionString)
  const res = await getDocs(collection1)
  return res.docs.map(doc => doc.data())
}

const getItemFromFirebaseByCollectionString = async (collectionString: string, id: string) => {
  const collection1 = collection(db, collectionString)
  const q = query(collection1, where('id', '==', Number(id)))
  const res = await getDocs(q)
  return res.docs.map(doc => doc.data())[0]
}

export const getCategories = async () => getAllDocsFromFirebaseByCollectionString('categories')
export const getPosts = async () => getAllDocsFromFirebaseByCollectionString('blog_posts')
export const getProducts = async () => getAllDocsFromFirebaseByCollectionString('products')
export const getTestimonials = async () => getAllDocsFromFirebaseByCollectionString('testimonials')

export const getPost = async (id: string) => getItemFromFirebaseByCollectionString('blog_posts', id)
export const getProduct = async (id: string) => getItemFromFirebaseByCollectionString('products', id)








// const testimonialsToAdd = [
//   { id: 1, customer_name: "Emma Johnson", testimonial: "I absolutely loved the Red Rose Bouquet! The roses were fresh, vibrant, and beautifully arranged. They made the perfect gift for my mother on her birthday." },
//   { id: 3, customer_name: "Sophia Martinez", testimonial: "Ordered the Pink Rose Delight for my girlfriend on Valentine's Day, and she was thrilled. The roses were fresh and delivered on time. Excellent service!" },
//   { id: 5, customer_name: "Ava Brown", testimonial: "The Mixed Roses bouquet was a delight. The colors were vibrant, and the flowers smelled amazing. It was a great addition to our dining room table." },
//   { id: 4, customer_name: "Rachel Smith", testimonial: "The Long Stem White Roses were elegant and perfect for our wedding anniversary. They arrived on time and in great condition. Highly recommended!" },
//   { id: 2, customer_name: "Sarah Davis", testimonial: "The Tulip Garden arrangement was stunning, and it brightened up our living room. The flowers lasted for a surprisingly long time, and we couldn't be happier." }
// ]

// const productsToAdd = [
//   { 
//     id: 1, 
//     category_id: 1, 
//     name: "Bridal Bouquet - Classic",
//     description: "A classic bridal bouquet with a mix of roses and lilies.",
//     price: "79.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680925556/realm/products/roses/bridal_1_eqxzia.jpg",
//     stock: 10
//   },
//   { 
//     id: 7, 
//     category_id: 1, 
//     name: "Bridal Bouquet - Rustic",
//     description: "Rustic bridal bouquet with wildflowers and greenery.",
//     price: "69.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680925557/realm/products/roses/bridal-bouquet-rustic_1_acwhkg.jpg",
//     stock: 10
//   },
//   { 
//     id: 9, 
//     category_id: 2, 
//     name: "Spring Surprise",
//     description: "A fresh spring bouquet with tulips, daffodils, and hyacinths.",
//     price: "49.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680925266/realm/products/roses/spring-surprise_bubt6u.jpg",
//     stock: 30
//   },
//   { 
//     id: 10, 
//     category_id: 2, 
//     name: "Colorful Gerberas",
//     description: "A vibrant bouquet of assorted gerbera daisies.",
//     price: "44.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680925168/realm/products/roses/gerbera_ojoli5.jpg",
//     stock: 35
//   },
//   { 
//     id: 11, 
//     category_id: 2, 
//     name: "Exotic Orchids",
//     description: "A stunning arrangement of exotic orchids.",
//     price: "64.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680925105/realm/products/roses/orchid_shrsut.jpg",
//     stock: 15
//   },
//   { 
//     id: 12, 
//     category_id: 2, 
//     name: "Romantic Roses & Lilies",
//     description: "A romantic combination of roses and lilies in a beautiful bouquet.",
//     price: "59.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680925044/realm/products/roses/rose-lily_1_q1kvmv.jpg",
//     stock: 25
//   },
//   { 
//     id: 13, 
//     category_id: 2, 
//     name: "Sunflower Delight",
//     description: "A cheerful bouquet of sunflowers and greenery.",
//     price: "39.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680924925/realm/products/roses/sun_zfowwc.jpg",
//     stock: 30
//   },
//   { 
//     id: 14, 
//     category_id: 2, 
//     name: "Seasonal Blooms Basket",
//     description: "A charming basket filled with a variety of seasonal blooms.",
//     price: "54.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680925330/realm/products/roses/bloom_afnuvx.jpg",
//     stock: 20
//   },
//   { 
//     id: 15, 
//     category_id: 2, 
//     name: "Mixed Bouquet - Fresh",
//     description: "A delightful mixed bouquet featuring fresh seasonal flowers.",
//     price: "49.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680925378/realm/products/roses/mixed_qjj3o6.jpg",
//     stock: 30
//   },
//   { 
//     id: 16, 
//     category_id: 2, 
//     name: "Lavender Love",
//     description: "A beautiful bouquet of lavender and other complementary flowers.",
//     price: "49.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680925438/realm/products/roses/lav_lxk9km.jpg",
//     stock: 25
//   },
//   { 
//     id: 17, 
//     category_id: 3, 
//     name: "Red Rose Bouquet",
//     description: "A classic bouquet of one dozen red roses.",
//     price: "49.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680922966/realm/products/roses/rose_1_ljglxd.jpg",
//     stock: 30
//   },
//   { 
//     id: 18, 
//     category_id: 3, 
//     name: "Pink Rose Delight",
//     description: "A beautiful bouquet of one dozen pink roses.",
//     price: "49.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680923047/realm/products/roses/pink-rose_1_jbxejn.jpg",
//     stock: 25
//   },
//   { 
//     id: 19, 
//     category_id: 3, 
//     name: "Mixed Roses",
//     description: "A vibrant bouquet of mixed color roses.",
//     price: "49.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680923168/realm/products/roses/multi-rose_1_kac0me.jpg",
//     stock: 20
//   },
//   { 
//     id: 20, 
//     category_id: 3, 
//     name: "Long Stem White Roses",
//     description: "An elegant bouquet of one dozen long-stemmed white roses.",
//     price: "59.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680923291/realm/products/roses/white-roses_zhatsw.jpg",
//     stock: 15
//   },
//   { 
//     id: 21, 
//     category_id: 4, 
//     name: "Mixed Tulips",
//     description: "A colorful bouquet of fresh tulips in various colors.",
//     price: "34.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680924490/realm/products/roses/close-up-of-a-beautiful-bouquet-of-white-and-yello-2021-09-01-09-43-36-utc_1_vb4mfl.jpg",
//     stock: 30
//   },
//   { 
//     id: 22, 
//     category_id: 4, 
//     name: "Red Tulip Bunch",
//     description: "A striking bouquet of one dozen red tulips.",
//     price: "34.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680924313/realm/products/roses/bouquet-of-tulip-flowers-2021-08-26-16-56-48-utc_2_1_eo6huh.jpg",
//     stock: 25
//   },
//   { 
//     id: 23, 
//     category_id: 4, 
//     name: "Yellow Tulip Delight",
//     description: "A bright and cheerful bouquet of one dozen yellow tulips.",
//     price: "34.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680924621/realm/products/roses/spring-tulips-flowers-2022-03-17-06-36-12-utc_1_tkjnhm.jpg",
//     stock: 20
//   },
//   { 
//     id: 24, 
//     category_id: 4, 
//     name: "Purple Tulip Passion",
//     description: "A beautiful bouquet of one dozen purple tulips.",
//     price: "34.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680924621/realm/products/roses/bouquet-of-tulips-on-a-white-background-top-view-2022-04-07-20-30-50-utc_1_rdhz2t.jpg",
//     stock: 25
//   },
//   { 
//     id: 25, 
//     category_id: 5, 
//     name: "Stargazer Lilies",
//     description: "A lovely bouquet of stunning stargazer lilies.",
//     price: "39.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680924728/realm/products/roses/pink-lily_hibvjf.jpg",
//     stock: 20
//   },
//   { 
//     id: 26, 
//     category_id: 5, 
//     name: "Calla Lily Elegance",
//     description: "A graceful bouquet of elegant calla lilies.",
//     price: "49.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680924728/realm/products/roses/calla_j0m4rl.jpg",
//     stock: 15
//   },
//   { 
//     id: 27, 
//     category_id: 5, 
//     name: "Asiatic Lilies",
//     description: "A cheerful arrangement of bright Asiatic lilies.",
//     price: "39.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680924855/realm/products/roses/asiatic_vpr61c.jpg",
//     stock: 20
//   },
//   { 
//     id: 28, 
//     category_id: 5, 
//     name: "White Lily Bouquet",
//     description: "A serene bouquet of one dozen white lilies.",
//     price: "49.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680924855/realm/products/roses/white-lilies_pklx8l.jpg",
//     stock: 15
//   },
//   { 
//     id: 29, 
//     category_id: 6, 
//     name: "Fruit & Gourmet Basket",
//     description: "A delicious assortment of fresh fruits and gourmet treats.",
//     price: "79.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680925948/realm/products/roses/basket_tsvczj.jpg",
//     stock: 10
//   },
//   { 
//     id: 31, 
//     category_id: 6, 
//     name: "Tea & Cookies Basket",
//     description: "A delightful basket of assorted teas and cookies.",
//     price: "49.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680926094/realm/products/roses/cookies-and-tea_umxf3w.jpg",
//     stock: 15
//   },
//   { 
//     id: 33, 
//     category_id: 7, 
//     name: "Funeral Spray",
//     description: "An elegant funeral spray with white lilies, roses, and carnations.",
//     price: "89.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680926284/realm/products/roses/funeral-1_1_gptf0o.jpg",
//     stock: 5
//   },
//   { 
//     id: 38, 
//     category_id: 8, 
//     name: "Orchid Plant",
//     description: "A stunning potted orchid plant with beautiful blooms.",
//     price: "59.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680926343/realm/products/roses/orchid-plant_1_gacgpg.jpg",
//     stock: 15
//   },
//   { 
//     id: 3, 
//     category_id: 1, 
//     name: "Bridesmaid Bouquet - Chic",
//     description: "Chic bridesmaid bouquet with a blend of tulips and daisies.",
//     price: "59.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681073373/realm/products/roses/bridesmaids-1_d9gey0.jpg",
//     stock: 15
//   },
//   { 
//     id: 5, 
//     category_id: 1, 
//     name: "Wedding Arch Flowers",
//     description: "Beautiful flower arrangement for your wedding arch.",
//     price: "249.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681074021/realm/products/roses/arch_cmiosu.jpg",
//     stock: 5
//   },
//   { 
//     id: 8, 
//     category_id: 1, 
//     name: "Cake Flowers - Delicate",
//     description: "Delicate flowers to adorn your wedding cake.",
//     price: "39.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681079638/realm/products/roses/beautiful-wedding-cake-flowers_byu883.jpg",
//     stock: 15
//   },
//   { 
//     id: 30, 
//     category_id: 6, 
//     name: "Chocolate Lovers Basket",
//     description: "A decadent gift basket filled with chocolate goodies.",
//     price: "59.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681079823/realm/products/roses/chocolate_1_sajkdg.jpg",
//     stock: 10
//   },
//   { 
//     id: 34, 
//     category_id: 7, 
//     name: "Heartfelt Sympathy",
//     description: "A beautiful arrangement of white roses and lilies in a basket.",
//     price: "79.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681302284/realm/products/heartfelt-sympathy_iiqyod.jpg",
//     stock: 20
//   },
//   { 
//     id: 39, 
//     category_id: 8, 
//     name: "Peace Lily",
//     description: "A lovely peace lily plant in a decorative container.",
//     price: "39.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680926413/realm/products/roses/peace-lily_ozhglq.jpg",
//     stock: 20
//   },
//   { 
//     id: 40, 
//     category_id: 8, 
//     name: "Bonsai Tree",
//     description: "A beautiful and unique bonsai tree for a touch of elegance.",
//     price: "49.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680926473/realm/products/roses/bonsai_cnxhmc.jpg",
//     stock: 10
//   },
//   { 
//     id: 59, 
//     category_id: 11, 
//     name: "Frosted Elegance",
//     description: "An elegant bouquet of white flowers and frosted pinecones.",
//     price: "59.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1680925557/realm/products/roses/bridal-bouquet-winter_1_z8ccxb.jpg",
//     stock: 25
//   },
//   { 
//     id: 2, 
//     category_id: 1, 
//     name: "Table Centerpiece - Elegant",
//     description: "Elegant table centerpiece featuring roses and eucalyptus.",
//     price: "49.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681051816/realm/products/roses/centerpiece_1_waepqa.jpg",
//     stock: 25
//   },
//   { 
//     id: 4, 
//     category_id: 1, 
//     name: "Groom Boutonniere - Stylish",
//     description: "Stylish groom boutonniere with a rose and babies breath.",
//     price: "14.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681073688/realm/products/roses/groom-1_hidprb.jpg",
//     stock: 50
//   },
//   { 
//     id: 66, 
//     category_id: 11, 
//     name: "Winter Warmth",
//     description: "A cozy winter bouquet with a mix of warm-hued flowers.",
//     price: "49.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681073810/realm/products/roses/winter-bouquet_1_ppw0hl.jpg",
//     stock: 30
//   },
//   { 
//     id: 65, 
//     category_id: 11, 
//     name: "Frosty Hydrangeas",
//     description: "A lovely bouquet of frosted hydrangeas and greenery.",
//     price: "54.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681073878/realm/products/roses/hydrangea_yrsh9j.jpg",
//     stock: 25
//   },
//   { 
//     id: 6, 
//     category_id: 1, 
//     name: "Aisle Flowers - Romantic",
//     description: "Romantic aisle flowers with a mix of roses and hydrangeas.",
//     price: "29.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681074166/realm/products/roses/aisle_1_doz2gc.jpg",
//     stock: 20
//   },
//   { 
//     id: 32, 
//     category_id: 6, 
//     name: "Wine & Cheese Basket",
//     description: "A luxurious gift basket with fine wine and gourmet cheese.",
//     price: "99.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681079906/realm/products/roses/wine-cheese_1_utdj50.jpg",
//     stock: 5
//   },
//   { 
//     id: 42, 
//     category_id: 8, 
//     name: "Ficus Plant",
//     description: "A lush ficus plant in a decorative pot.",
//     price: "54.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681302284/realm/products/ficus_uaahg3.jpg",
//     stock: 10
//   },
//   { 
//     id: 45, 
//     category_id: 9, 
//     name: "Sweet Hyacinth",
//     description: "A fragrant bouquet of lovely hyacinth flowers.",
//     price: "49.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681302284/realm/products/sweet-hyacinth_suennb.jpg",
//     stock: 20
//   },
//   { 
//     id: 44, 
//     category_id: 9, 
//     name: "Daffodil Delight",
//     description: "A bright and cheerful bouquet of daffodils.",
//     price: "39.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681302284/realm/products/daffodil_migsh1.jpg",
//     stock: 25
//   },
//   { 
//     id: 41, 
//     category_id: 8, 
//     name: "Dish Garden",
//     description: "A charming mix of green plants in a decorative dish.",
//     price: "44.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681302284/realm/products/dish-garden_ytpayp.jpg",
//     stock: 15
//   },
//   { 
//     id: 36, 
//     category_id: 7, 
//     name: "Eternal Light",
//     description: "A peaceful arrangement of white flowers with a candle centerpiece.",
//     price: "59.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681302284/realm/products/eternal-light_mzbowz.jpg",
//     stock: 20
//   },
//   { 
//     id: 35, 
//     category_id: 7, 
//     name: "Peaceful Memories",
//     description: "A comforting arrangement of white flowers in a serene vase.",
//     price: "69.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681302284/realm/products/peaceful-memories_a2eb7e.jpg",
//     stock: 15
//   },
//   { 
//     id: 37, 
//     category_id: 7, 
//     name: "Graceful Tribute",
//     description: "A classic bouquet of red and white flowers for expressing sympathy.",
//     price: "49.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681302284/realm/products/graceful-tribute_qxveb6.jpg",
//     stock: 25
//   },
//   { 
//     id: 43, 
//     category_id: 9, 
//     name: "Tulip Garden",
//     description: "A colorful bouquet of fresh tulips in various colors.",
//     price: "39.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681302284/realm/products/tulip-garden_zwyns8.jpg",
//     stock: 25
//   },
//   { 
//     id: 49, 
//     category_id: 9, 
//     name: "Colorful Spring",
//     description: "A vibrant spring bouquet with a mix of roses, tulips, and daisies.",
//     price: "54.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681330557/realm/products/colorful-spring_ml3zh2.jpg",
//     stock: 30
//   },
//   { 
//     id: 64, 
//     category_id: 11, 
//     name: "Evergreen Delight",
//     description: "A charming arrangement of evergreens and winter flowers.",
//     price: "49.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681330557/realm/products/evergreen-delight_mgol5s.jpg",
//     stock: 20
//   },
//   { 
//     id: 62, 
//     category_id: 11, 
//     name: "Crimson & Ice",
//     description: "A beautiful winter bouquet with red and white flowers.",
//     price: "59.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681330557/realm/products/crimson-ice_zzwzo2.jpg",
//     stock: 25
//   },
//   { 
//     id: 48, 
//     category_id: 9, 
//     name: "Garden Basket",
//     description: "A charming basket filled with a mix of spring flowers.",
//     price: "64.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681330557/realm/products/garden-basket_pfca6o.jpg",
//     stock: 20
//   },
//   { 
//     id: 51, 
//     category_id: 10, 
//     name: "Christmas Centerpiece",
//     description: "A festive centerpiece with red roses, carnations, and pinecones.",
//     price: "59.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681330557/realm/products/christmas-centerpiece_uhftgk.jpg",
//     stock: 20
//   },
//   { 
//     id: 47, 
//     category_id: 9, 
//     name: "Blooming Azalea",
//     description: "A potted blooming azalea plant, perfect for adding color to your home.",
//     price: "34.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681330557/realm/products/azalea_t6lwff.jpg",
//     stock: 15
//   },
//   { 
//     id: 46, 
//     category_id: 9, 
//     name: "Spring Sunshine",
//     description: "A radiant arrangement of sunflowers, daffodils, and tulips.",
//     price: "59.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681330558/realm/products/spring-sunshine_eomlka.jpg",
//     stock: 25
//   },
//   { 
//     id: 56, 
//     category_id: 10, 
//     name: "Festive Bouquet",
//     description: "A cheerful holiday bouquet with red and green accents.",
//     price: "49.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681330558/realm/products/festive-bouquet_dgldcu.jpg",
//     stock: 25
//   },
//   { 
//     id: 57, 
//     category_id: 10, 
//     name: "Holiday Cactus",
//     description: "A unique holiday cactus plant to add some cheer to your home.",
//     price: "34.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681330558/realm/products/holiday-cactus_mztpik.jpg",
//     stock: 10
//   },
//   { 
//     id: 55, 
//     category_id: 10, 
//     name: "Hanukkah Blooms",
//     description: "A lovely arrangement of blue and white flowers for Hanukkah celebrations.",
//     price: "54.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681330558/realm/products/hanukkah_blooms_peeaml.jpg",
//     stock: 15
//   },
//   { 
//     id: 53, 
//     category_id: 10, 
//     name: "Poinsettia Plant",
//     description: "A classic potted poinsettia plant for holiday decor.",
//     price: "29.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681330558/realm/products/poinsettia_xwfpwu.jpg",
//     stock: 20
//   },
//   { 
//     id: 63, 
//     category_id: 11, 
//     name: "Winter Berries",
//     description: "A festive arrangement of winter berries and greenery.",
//     price: "44.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681330559/realm/products/winter-berries_sliuzb.jpg",
//     stock: 30
//   },
//   { 
//     id: 52, 
//     category_id: 10, 
//     name: "Holiday Wreath",
//     description: "A beautiful holiday wreath adorned with berries and ribbons.",
//     price: "49.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681330559/realm/products/wreath_nihhdu.jpg",
//     stock: 10
//   },
//   { 
//     id: 54, 
//     category_id: 10, 
//     name: "Winter Wonderland",
//     description: "A stunning bouquet of white roses, lilies, and frosted pinecones.",
//     price: "59.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681330558/realm/products/winter-wonderland_zeqbrw.jpg",
//     stock: 25
//   },
//   { 
//     id: 60, 
//     category_id: 11, 
//     name: "Winter Roses",
//     description: "A stunning arrangement of roses in winter shades.",
//     price: "54.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681330558/realm/products/winter-roses_mjnanm.jpg",
//     stock: 30
//   },
//   { 
//     id: 58, 
//     category_id: 10, 
//     name: "New Year Sparkle",
//     description: "A dazzling bouquet of flowers to celebrate the New Year.",
//     price: "64.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681330558/realm/products/new-year-sparkle_gtijvi.jpg",
//     stock: 15
//   },
//   { 
//     id: 50, 
//     category_id: 9, 
//     name: "Blooming Orchid",
//     description: "A stunning blooming orchid plant to brighten your day.",
//     price: "49.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681330558/realm/products/orchid_wio66h.jpg",
//     stock: 20
//   },
//   { 
//     id: 61, 
//     category_id: 11, 
//     name: "Snowy Lilies",
//     description: "A delicate bouquet of white lilies for a touch of winter elegance.",
//     price: "49.99",
//     image_url: "https://res.cloudinary.com/dakfmjumy/image/upload/v1681330558/realm/products/snowy-lilies_czklmr.jpg",
//     stock: 20
//   },
// ]