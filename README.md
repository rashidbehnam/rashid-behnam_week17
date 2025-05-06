# 📇 اپلیکیشن مدیریت مخاطبین با ری‌اکت

یک اپلیکیشن ساده و زیبا برای مدیریت مخاطبین، ساخته شده با React. این پروژه عملیات CRUD، اعتبارسنجی فرم‌ها، مدیریت وضعیت با Context و استفاده از `json-server` به عنوان API فیک را پیاده‌سازی می‌کند.

---

## 🚀 شروع سریع

### 📆 پیش‌نیازها

برای اجرای پروژه، ابتدا باید موارد زیر را نصب کرده باشید:

* [Node.js](https://nodejs.org/) (نسخه 16 یا بالاتر)
* [npm](https://www.npmjs.com/)
* نصب `json-server` به صورت global یا local

---

### 🔧 نصب و راه‌اندازی

1. ابتدا پروژه را کلون کنید:

```bash
git clone https://github.com/rashidbehnam/rashid-behnam_week17.git
cd rashid-behnam_week17
```

2. وابستگی‌ها را نصب کنید:

```bash
npm install
```

---

## 🛠 اجرای پروژه

### 🌐 اجرای سرور توسعه ری‌اکت

```bash
npm start
```

اپلیکیشن در آدرس `http://localhost:3000` اجرا خواهد شد.

---

### 📁 اجرای JSON Server (برای API فیک)

ابتدا مطمئن شوید فایل `db.json` در ریشه پروژه وجود دارد و شامل اطلاعات اولیه است. به عنوان مثال:

```json
[
  {
    "id": 1,
    "name": "rashid",
    "family": "behnam",
    "email": "rashidbehnam2012@gmail.com",
    "phone": "09145413546"
  }
]
```

سپس دستور زیر را برای راه‌اندازی سرور اجرا کنید:

```bash
npx json-server --watch db.json --port 3001
```

API در آدرس `http://localhost:3001/contacts` قابل دسترسی خواهد بود.

---

## ✅ امکانات

* افزودن، ویرایش و حذف مخاطب
* حذف چند مخاطب به‌صورت گروهی
* اعتبارسنجی فرم‌ها با **Yup** و **React Hook Form**
* مدیریت وضعیت با Context و useReducer
* اتصال به API با استفاده از `fetch`
* نوتیفیکیشن با `react-toastify`

---

## 🔪 قابلیت‌های اختیاری

* ذخیره‌سازی اطلاعات در localStorage (در شاخه‌ی `localStorage`)
* انتشار پروژه روی Vercel یا Netlify
* افزودن فیلدهای بیشتر به مخاطبین

---

## 📄 مجوز

MIT

---

## 💬 تماس

ساخته‌شده با 💙 توسط رشید بهنام
