const { Sequelize, DataTypes } = require('sequelize');
import * as dotenv from 'dotenv'
dotenv.config()
/* Creating a new instance of Sequelize. */
export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    define: {
        freezeTableName: true,
    }
});

export const user = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    online: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },

}, {
    timestamps: false
})

export const room = sequelize.define('room', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }

}, {
    timestamps: false
})

export const typeMessage = sequelize.define('type_message', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, {
    timestamps: false
})

export const roomType = sequelize.define('room_type', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
})

export const userRoom = sequelize.define('user_room', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

}, {
    timestamps: false
})
export const Contacts = sequelize.define('contacts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    contact_of: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    contact_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, {
    timestamps: false
})

export const message = sequelize.define('message', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    to: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    type_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
    }

}, {
    timestamps: false
})