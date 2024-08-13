//  Mongo DB Atlas connection
import { connect } from "mongoose";
/*const options = {
    maxPoolSize: 100,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};*/

const db_uri = process.env.db_uri;
async function main() {
  await connect(db_uri);
}
main()
  .then(() =>
    console.log("MongoDB Database on Mongo Atlas Cloud Service Connected.")
  )
  .catch((err) => console.log(`Database connection failed: ${err.message}`));