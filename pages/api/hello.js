// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sequelize, user, room, roomType, message, typeMessage, userRoom } from "../../config/db"

export default async function handler(req, res) {
  try {


    await sequelize.authenticate();

    console.log('Connection has been established successfully.');
    (async () => {
      await sequelize.sync({ alter: true });
      // const jane = user.build({ username: "juan", password: "1234" });
      const userCreated = await user.create({ username: "tony", password: "1234" });
      // await jane.save();
      // console.log(jane.toJSON().online);
      // console.log('juan was saved to the database!');
      // const userRooms = await userRoom.findAll();
      console.log(JSON.stringify(userCreated, null, 2));
    })();
    console.log(process.env.DB_NAME);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  res.status(200).json({ name: 'John Doe' })
}
