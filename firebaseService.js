/* ================== FIREBASE Configuration ================== */
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
// =============================================================

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
 // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

 exports.firebase_auth = () => admin.auth();

 