# Pawfect Match - Dog Adoption Platform

A Next.js application that helps users find their perfect dog companion through an intelligent matching system.

## 🐾 Features

- User authentication
- Dog search with multiple filters
- Favorite system
- Breed filtering
- Location-based matching
- Age range filtering
- Intelligent match generation
- Responsive design

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Authentication**: Custom auth with cookies
- **API Integration**: Custom fetch wrapper
- **TypeScript**: For type safety

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Git

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd pawfect-match
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_BASE_URL=<API endpoint>
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
pawfect-match/
├── app/
│   ├── api/
│   │   └── favorites/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   │   └── LoginForm.tsx
│   ├── dashboard/
│   │   ├── FavoritesBar.tsx
│   │   ├── Header.tsx
│   │   ├── Pagination.tsx
│   │   └── PetCard.tsx
│   └── search/
│       └── FilterPanel.tsx
├── lib/
│   └── api.ts
├── store/
│   └── dogsStore.ts
├── types/
│   └── dogs.ts
└── public/
    └── dog-illustration.svg
```

## 🔑 Authentication

The application uses cookie-based authentication. Users need to provide:
- Name
- Email

## 🐕 API Integration

The application integrates with a dog adoption API that provides:
- Dog search functionality
- Breed listings
- Location services
- Match generation

### API Endpoints Used:
- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout
- `GET /dogs/breeds` - Get available breeds
- `POST /dogs/search` - Search dogs with filters
- `GET /dogs/{id}` - Get specific dog details
- `POST /dogs/match` - Generate match from favorites

## 💾 State Management

Zustand is used for state management with the following stores:
- `dogsStore`: Manages dog data, favorites, and search filters
- Authentication state is managed through cookies

## 🎨 Styling

The application uses Tailwind CSS with a custom color scheme:
- Primary: Purple (#6B46C1)
- Secondary: Gray scale
- Accent colors for various states

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔒 Environment Variables

Required environment variables:
```env
NEXT_PUBLIC_API_BASE_URL=<API endpoint>
```

## 🧪 Testing

```bash
# Run tests
npm run test
# or
yarn test
```

## 📦 Build

```bash
# Create production build
npm run build
# or
yarn build
```

## 🚀 Deployment

The application can be deployed to any platform that supports Next.js:
- Vercel (recommended)
- Netlify
- Custom server

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Dog adoption API provider
- Next.js team
- Tailwind CSS team
- All contributors

## 📞 Support

For support, email <support-email> or join our Slack channel.

---

Remember to replace `<repository-url>`, `<API endpoint>`, and `<support-email>` with actual values when implementing this documentation.
