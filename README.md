
# To-Do List Project Backend

ในส่วนของโปรเจ็คนี้ในฝั่งของ Backend ผมได้ใช้ Node.js Express.js MongoDB ในการสร้าง Api และเชื่อมต่อมฐานข้อมูล




## Deploy
Deploy ด้วย Vercel
 - https://todo-list-backend-tau.vercel.app/updatechecktask
 - 
## Route
 - ***แสดง Tasks ทั้งหมด*** - GET : /tasks
 - ***แสดง Tasks จาก ID*** - GET : /tasks/{$id}
 - ***เพิ่ม Task*** - POST : /addtask
 - ***แก้ไข Task จาก ID*** PATCH : /updatetask/{$id}
 - ***แก้ไข Task Checked*** PATCH : /updatechecktask/{$id}
 - ***ลบ Task จาก ID*** PATCH : /deletetask/{$id}
