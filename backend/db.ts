import { connect } from 'mongoose';
const url = process.env.DB_BASE_URL || '';
const DB_NAME = process.env.DB_NAME;

const dbConnection = async (): Promise<void> => {
  try {
    await connect(url, {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useFindAndModify: false}, 
      (err) => {
        if(!err){
          console.log(`Database ${DB_NAME} is up...`);
        } else {
          console.log(`Database is not connected error:${err}`);
        }
      }
    );
    } catch (error) {
      console.log(error);
    }
};

export default dbConnection;