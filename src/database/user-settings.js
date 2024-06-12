import pool from "./db.js";

export const createUserSettingsTable = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS user_settings (
            id SERIAL PRIMARY KEY,
            salesforce_service_username VARCHAR(100),
            salesforce_service_password VARCHAR(100),
            client_id VARCHAR(100),
            client_secret VARCHAR(100),
            salesforce_security_token VARCHAR(100),
            salesforce_instance_url VARCHAR(100),
            salesforce_api_version VARCHAR(100),
            unified_individual_dmo_api_name VARCHAR(100),
            unified_contact_point_email_dmo_api_name VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
    );

    return {
      message: "Table users created successfully!",
    };
  } catch (error) {
    console.error("Error creating user_settings table", error);
    return {
      message: "Error creating user_settings table",
      error: error,
    };
  }
};

export const updateUserSettings = async (data) => {
  console.log("Data to be inserted into users table", data);
  try {
    let { rows } = await pool.query(`SELECT * FROM user_settings WHERE id = 1`);
    if (rows.length === 0) {
      await pool.query(
        `INSERT INTO user_settings (
        salesforce_service_username,
        salesforce_service_password,
        client_id,
        client_secret,
        salesforce_security_token,
        salesforce_instance_url,
        salesforce_api_version,
        unified_individual_dmo_api_name,
        unified_contact_point_email_dmo_api_name
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          data.serviceUserEmail,
          data.serviceUserPassword,
          data.clientId,
          data.clientSecret,
          data.serviceUserSecurityToken,
          data.salesforceInstanceUrl,
          data.salesforceApiVersion,
          data.unifiedIndividualDmoApi,
          data.unifiedContactPointEmailDmo,
        ]
      );
    } else {
      await pool.query(
        `UPDATE user_settings SET 
      salesforce_service_username = $1,
      salesforce_service_password = $2,
      client_id = $3,
      client_secret = $4,
      salesforce_security_token = $5,
      salesforce_instance_url = $6,
      salesforce_api_version = $7,
      unified_individual_dmo_api_name = $8,
      unified_contact_point_email_dmo_api_name = $9
      WHERE id = 1
      RETURNING *`,
        [
          data.serviceUserEmail,
          data.serviceUserPassword,
          data.clientId,
          data.clientSecret,
          data.serviceUserSecurityToken,
          data.salesforceInstanceUrl,
          data.salesforceApiVersion,
          data.unifiedIndividualDmoApi,
          data.unifiedContactPointEmailDmo,
        ]
      );
    }

    return {
      message: "Data inserted into users table",
      data: rows,
    };
  } catch (error) {
    console.error("Error inserting data into users table", error);
    return {
      message: "Error inserting data into users table",
      error: error,
    };
  }
};

export const readUserSettings = async () => {
  try {
    const { rows } = await pool.query(`SELECT * FROM user_settings`);

    return {
      message: "Data fetched from users table",
      data: rows,
    };
  } catch (error) {
    console.error("Error fetching data from users table", error);
    return {
      message: "Error fetching data from users table",
      error: error,
    };
  }
};
