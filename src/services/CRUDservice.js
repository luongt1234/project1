const connection = require('../config/database');

const createUser = async (username, password) => {
    try {
        // Kiểm tra xem username đã tồn tại hay chưa
        const [result1] = await connection.query('SELECT * FROM User WHERE username = ?', [username]);

        if (result1.length === 0) { // Nếu không tìm thấy user
            // Chèn user mới vào database
            await connection.query('INSERT INTO User (username, password) VALUES (?, ?)', [username, password]);
            return true;
        }
        return false; // Nếu user đã tồn tại
    } catch (error) {
        console.error('Error creating user:', error.message);
        throw error; // Ném lỗi ra để xử lý ở nơi gọi hàm
    }
};


const checkUser = async (username, password) => {
    const [result, field] = await connection.query('select * from User where username = ? AND password = ?', [username, password]);
    if (result.length === 0){
        return result;
    }
    return result;
};

const selectUserByUser = async (username) => {
    const [result, field] = await connection.query('select * from User where username = ?', [username]);
    if (result.length === 0){
        // console.log(result);
        return null;
    }
    return result;
}

const updateRefreshToken = async (user, refreshToken) => {
    try {
        const [result, field] = await connection.query('UPDATE User SET refreshToken = ? WHERE username = ?;', [refreshToken, user])
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    selectUserByUser, checkUser, updateRefreshToken, createUser
};