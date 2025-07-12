# E-Commerce Website

A modern e-commerce platform built with React, featuring user and admin interfaces with comprehensive product management, shopping cart functionality, and order processing.

## 🚀 Features

### 👤 User Features
- **Authentication**: User registration and login system
- **Product Browsing**: Browse products with search and filtering capabilities
- **Product Details**: View detailed product information with images and descriptions
- **Shopping Cart**: Add/remove products, adjust quantities, and manage cart items
- **Checkout Process**: Complete purchase with shipping address and payment
- **Order Management**: Track order history and status
- **User Profile**: Manage personal information and shipping addresses
- **Responsive Design**: Mobile-friendly interface

### 🛠️ Admin Features
- **Product Management**: Add, edit, delete products with image uploads
- **Category Management**: Create, edit, delete product categories
- **Order Management**: View and update order statuses
- **User Management**: View user list and manage permissions
- **Dashboard**: Overview of sales, orders, and inventory

## 🛠️ Technologies Used

### Frontend
- **React 18.3.1** - Modern React with hooks and functional components
- **Redux Toolkit 2.8.2** - State management for cart and user data
- **React Router DOM 7.6.2** - Client-side routing
- **Ant Design 5.26.1** - UI component library
- **SCSS/Sass 1.89.2** - Advanced CSS preprocessing
- **Axios 1.10.0** - HTTP client for API calls
- **React Loading Skeleton 3.5.0** - Loading placeholders

### Development Tools
- **Create React App** - React development environment
- **JSON Server 1.0.0-beta.3** - Mock API server for development
- **FontAwesome 6.7.2** - Icon library
- **Web Vitals 2.1.4** - Performance monitoring


## 📋 Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Git** for version control
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ec-web
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm start
```

The application will open at `http://localhost:3000`

### 4. Available Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App (irreversible)
```

## 📁 Project Structure

```
ec-web/
├── public/                    # Static files
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── images/
├── src/
│   ├── components/           # Reusable components
│   │   ├── Admin/           # Admin-specific components
│   │   │   ├── AddDetail/   # Product detail management
│   │   │   ├── EditCategory/ # Category editing
│   │   │   ├── ListCategory/ # Category listing
│   │   │   └── ViewCategory/ # Category viewing
│   │   ├── User/            # User-specific components
│   │   │   ├── Address/     # Address management
│   │   │   ├── Menu/        # Navigation menu
│   │   │   └── ProductDetail/ # Product detail view
│   │   ├── Allroutes/       # Route configuration
│   │   ├── Back/            # Back navigation
│   │   └── UploadImage/     # Image upload component
│   ├── pages/               # Main page components
│   │   ├── Admin/           # Admin pages
│   │   ├── Cart/            # Shopping cart
│   │   ├── Home/            # Homepage
│   │   ├── Login/           # User login
│   │   ├── Login4Admin/     # Admin login
│   │   ├── Signin/          # User registration
│   │   └── User/            # User dashboard
│   ├── func/                # Custom hooks and utilities
│   │   ├── Cookie/          # Cookie management
│   │   └── fetchAPI/        # API hooks
│   ├── redux/               # State management
│   │   ├── cartSlice.js     # Shopping cart state
│   │   └── store.js         # Redux store configuration
│   ├── services/            # API services
│   ├── utils/               # Utility functions
│   ├── constants/           # Application constants
│   ├── layouts/             # Layout components
│   ├── routes/              # Route definitions
│   ├── style/               # SCSS styles
│   │   ├── abstracts/       # Variables, mixins, animations
│   │   ├── base/            # Reset and typography
│   │   ├── components/      # Component styles
│   │   ├── layout/          # Layout styles
│   │   └── page/            # Page-specific styles
│   ├── App.js               # Main App component
│   └── index.js             # Application entry point
├── package.json             # Dependencies and scripts
└── README.md               # Project documentation
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for environment-specific configurations:

```env
REACT_APP_API_URL=http://localhost:3000
```

### API Configuration
The application uses Axios for API calls. Configure the base URL in `src/utils/request.js`:

```javascript
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
```

## 🎨 Styling

The project uses SCSS for styling with a modular architecture:

- **Abstracts**: Variables, mixins, and animations
- **Base**: Reset styles and typography
- **Components**: Reusable component styles
- **Layout**: Header, footer, and layout styles
- **Pages**: Page-specific styles

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔐 Authentication

The application supports two types of authentication:
- **User Authentication**: For regular customers
- **Admin Authentication**: For administrative users with elevated privileges

## 🛒 Shopping Cart Features

- Add/remove products
- Adjust quantities
- Persistent cart data
- Real-time cart updates
- Cart total calculation

## 📊 Admin Dashboard

Administrators can:
- Manage products (CRUD operations)
- Manage categories
- View and update orders
- Monitor user activity
- Upload product images

## 🧪 Testing

Run tests with:
```bash
npm test
```

The project includes:
- Unit tests for components
- Integration tests for user flows
- Performance testing with Web Vitals

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v0.1.0** - Initial release with basic e-commerce functionality
- User authentication and registration
- Product browsing and cart management
- Admin panel for product and category management

---

**Built with ❤️ using React and modern web technologies**