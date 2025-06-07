# Shorty

**Shorty** is a powerful and user-friendly URL shortener platform designed to help you create and manage shortened URLs instantly with advanced control and analytics.

## Features

* **Instant URL Shortening:** Generate short URLs quickly and easily.
* **Advanced Analytics:** Track clicks, user behavior, referrers, devices, and countries.
* **Secure Links:** Option to create password-protected short URLs.
* **QR Code Generation:** Automatically generate QR codes for every short URL.
* **More URL Controls:**

  * **Time-Based Expiration:** Set URLs to expire after a certain date/time.
  * **Click-Based Expiration:** Limit the number of clicks before URL expires.
  * **Country-Based Restrictions:** Restrict access to URLs by geographic location.
* **Mobile/Desktop Link Generator:** Generate URLs that redirect differently based on device type (mobile or desktop).

---

## Table of Contents

* [Preview](#preview)
* [Installation & Running](#installation--running)
* [Usage](#usage)
* [Features Explained](#features-explained)
* [API](#api)
* [Technology Stack](#technology-stack)
* [Contributing](#contributing)
* [License](#license)

---


## Preview

Gotcha! Here’s the **Preview** section with a dummy placeholder image:

---

Sure! Here's your updated **Preview** section with headings, subheadings, and a slight border style added to each image using Markdown with inline HTML for styling (since Markdown itself doesn’t support borders on images):

---

## Preview


#### Home Page

*Clean and simple URL shortening interface.*

<div style="border:1px solid #ddd; padding:4px; display:inline-block; margin-bottom: 20px;">
  <img src="https://raw.githubusercontent.com/DEEPAKbisht96/shorty/refs/heads/main/preview/home.png" alt="Shorty Website Home Page" width="800" />
</div>


#### Features

*Explore the powerful features of Shorty at a glance.*

<div style="border:1px solid #ddd; padding:4px; display:inline-block; margin-bottom: 20px;">
  <img src="https://raw.githubusercontent.com/DEEPAKbisht96/shorty/refs/heads/main/preview/features.png" alt="Shorty Website Features" width="800" />
</div>


#### Dashboard

*Real-time analytics and URL management dashboard.*

<div style="border:1px solid #ddd; padding:4px; display:inline-block; margin-bottom: 20px;">
  <img src="https://raw.githubusercontent.com/DEEPAKbisht96/shorty/refs/heads/main/preview/dashboard.png" alt="Shorty Website Dashboard" width="800" />
</div>


#### Advanced URL Controls

*Customize and control your shortened URLs with advanced options.*

<div style="border:1px solid #ddd; padding:4px; display:inline-block; margin-bottom: 20px;">
  <img src="https://raw.githubusercontent.com/DEEPAKbisht96/shorty/refs/heads/main/preview/advance_options.png" alt="Shorty Website Advance Url Control" width="800" />
</div>

---


## Installation & Running

Shorty uses Docker Compose for easy setup and running. Make sure you have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your system.

### Steps:

1. Clone the repository:

```bash
git clone git@github.com:DEEPAKbisht96/shorty.git
cd shorty
```

2. Create a `.env` file in the root directory (if needed) to customize environment variables:

```env
# Postgres credentials
POSTGRES_DB=<POSTGRES_DATABASE_NAME>
POSTGRES_USER=<POSTGRES_USER>
POSTGRES_PASSWORD=<YOUR_PASSWORD>


# Server configurations
PORT=8000
NODE_ENV="development"
DATABASE_URL="postgresql://<POSTGRES_USER>:<YOUR_PASSWORD>@postgres-db:5432/<POSTGRES_DATABASE_NAME>"
ACCESS_SECRET=5491a2d9bef2abe9be4864ce88b10ad427eb8790748c682b60243420dbd20a9
REFRESH_SECRET=d126cc553765d33d560477bd8612514898436c09a17a82907d757d53f86dfaa
RAZORPAY_KEY_ID=<YOUR_RAZORPAY_KEY_ID>
RAZORPAY_KEY_SECRET=<YOUR_RAZORPAY_SECRET>
```

3. Start all services with Docker Compose:

```bash
docker compose up
```

This command will build (if necessary) and start the Shorty backend, database, and any other required services.

4. Open your browser and visit:

```
http://localhost:3000
```

You should see the Shorty web app running.

---

## Usage

* Open your browser and go to the home page.
* Paste the long URL into the input box.
* Choose your URL controls (optional):

  * Expiration date/time
  * Maximum clicks
  * Password protection
  * Country restrictions
  * Device-based redirection
* Click **Shorten**.
* Get your short URL and QR code instantly.
* Track the URL analytics dashboard for detailed insights.

---

## Features Explained

### Instant URL Shortening

Generate shortened URLs instantly to share in messages, emails, social media, or anywhere.

### Advanced Analytics

Get real-time analytics including:

* Number of clicks
* Unique visitors
* Traffic sources
* Device types (mobile/desktop)
* Geographic location

### Secure Links

Protect your shortened URLs with a password to restrict unauthorized access.

### QR Code Generation

Every short URL automatically comes with a QR code for easy scanning and sharing.

### More URL Controls

* **Time-Based Expiration:** URLs become invalid after the specified date/time.
* **Click-Based Expiration:** URLs expire after a set number of clicks.
* **Country Restrictions:** Only users from allowed countries can access the URL.
* **Device-Based Redirection:** Redirect users to different URLs based on mobile or desktop devices.

---

## Technology Stack

* Backend: Node.js / Express, Typescript
* Database: PostgreSQL
* Frontend: NextJs, Typescript
* Authentication & Security: JWT, Password hashing
* QR Code: QR code generation library

---

## Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
