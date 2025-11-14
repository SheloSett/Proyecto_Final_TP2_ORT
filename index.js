import config from "./src/config/config.js";
import { sequelize } from "./src/database/mysql.cnx.js";
import supabaseCnx from "./src/database/supabase.cnx.js";
import server from "./src/server.js";

const runServer = async () => {
	try {
		await sequelize.authenticate();
		supabaseCnx.connect();
		server.listen(
			config.SERVER_PORT,
			config.SERVER_HOST,
			console.log(`
                Server is running at: http://${config.SERVER_HOST}:${config.SERVER_PORT}
            `),
		);
	} catch (error) {
		console.log(`Error en el server`, error.message);
	}
};

runServer();
