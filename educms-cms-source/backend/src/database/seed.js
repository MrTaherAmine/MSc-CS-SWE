require('dotenv').config();
const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');

(async () => {
  try {
    const passwordHash = await bcrypt.hash('Admin123!', 10);

    const user = await pool.query(`
      INSERT INTO users (username,email,password_hash,first_name,last_name,role,is_active,email_verified)
      VALUES ('admin','admin@educms.local',$1,'EduCMS','Administrator','admin',true,true)
      ON CONFLICT (email) DO UPDATE SET password_hash=EXCLUDED.password_hash
      RETURNING user_id
    `, [passwordHash]);

    const categories = [
      ['Computer Science','computer-science','Computer science articles'],
      ['Programming','programming','Programming tutorials and guides'],
      ['Web Development','web-development','Modern web development resources'],
      ['Data Science','data-science','Data and analytics content']
    ];

    for (const item of categories) {
      await pool.query(`
        INSERT INTO categories (name,slug,description)
        VALUES ($1,$2,$3)
        ON CONFLICT (slug) DO NOTHING
      `, item);
    }

    const adminId = user.rows[0].user_id;
    const cat = await pool.query(`SELECT category_id FROM categories WHERE slug='web-development' LIMIT 1`);

    await pool.query(`
      INSERT INTO posts
      (title,slug,content,excerpt,author_id,category_id,status,published_at,is_featured,reading_time)
      VALUES
      ('Getting Started with React','getting-started-with-react',
       '<h2>React Fundamentals</h2><p>React is a component-based JavaScript library for modern user interfaces.</p>',
       'A practical introduction to React fundamentals.',
       $1,$2,'published',NOW(),true,5)
      ON CONFLICT (slug) DO NOTHING
    `, [adminId, cat.rows[0]?.category_id || null]);

    console.log('Seed complete. Demo login: admin@educms.local / Admin123!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
