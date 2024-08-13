const redisClient = require('../redisClient');

class StorageService {
    static async setStorage(userID, newData) {
        try {
            const key = `session:${userID}`;
            
           // Retrieve the existing data if existing
           const existingData = await this.getStorage(userID) || {};
            console.log('Existing data:', existingData);

           // Merge the new data with the existing data
            const updatedData = {
                dolphin_name: newData.dolphin_name || existingData.dolphin_name,  // Overwrite if new dolphin_name is provided
                photo_path: {
                    teeth_photo_path: newData.photo_path?.teeth_photo_path || existingData.photo_path?.teeth_photo_path || null, // Overwrite if new value
                    eye_photo_path: newData.photo_path?.eye_photo_path || existingData.photo_path?.eye_photo_path || null,
                    odontogramm_photo_path: newData.photo_path?.odontogramm_photo_path || existingData.photo_path?.odontogramm_photo_path || null,
                    marks_photo_path: newData.photo_path?.marks_photo_path || existingData.photo_path?.marks_photo_path || null,
                    silhouette_photo_path: newData.photo_path?.silhouette_photo_path || existingData.photo_path?.silhouette_photo_path || null
                }
            };

           // Set the merged data back to Redis
           await redisClient.set(key, JSON.stringify(updatedData));
            
        } catch (err) {
            console.error('Error setting session data in Redis:', err);
            throw err; // Re-throw the error after logging it
        }
    }

    static async getStorage(userID) {
        try {
            const key = `session:${userID}`;
            
            // Get the data from Redis using the user's ID as the key
            const data = await redisClient.get(key);
            
            if (data) {
                return JSON.parse(data); // Parse the JSON string back into an object
            } else {
                return null; // Handle the case where no data is found
            }
            
        } catch (err) {
            console.error('Error getting session data from Redis:', err);
            throw err;
        }
    }
}

module.exports = StorageService;