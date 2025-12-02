⚽ MatchDay - Your Ultimate Sports Companion



!\[React Native](https://img.shields.io/badge/React\_Native-0.76.5-blue)

!\[Expo](https://img.shields.io/badge/Expo-~54.0.0-black)

!\[License](https://img.shields.io/badge/License-MIT-green)



A beautiful, feature-rich cross-platform mobile application built with React Native and Expo for viewing sports matches, player profiles, and managing favorite teams.



📱 Screenshots



<div align="center">

&nbsp; <img src="screenshots/login.png" width="200" />

&nbsp; <img src="screenshots/home.png" width="200" />

&nbsp; <img src="screenshots/details.png" width="200" />

&nbsp; <img src="screenshots/profile.png" width="200" />

</div>



✨ Features



🔐 Authentication

\- User registration with form validation

\- Secure login system

\- Persistent authentication state



🏠 Home Screen

\- Browse upcoming matches from English Premier League

\- Real team logos fetched from TheSportsDB API

\- Beautiful card-based UI with gradients

\- Quick access to match details



👥 Players Section

\- Discover top players from elite teams

\- Player profiles with photos and stats

\- Search functionality to find specific players

\- Detailed player information (position, nationality, team)



⭐ Favorites

\- Save matches to favorites

\- Persistent storage using AsyncStorage

\- Quick access to saved matches

\- Remove matches from favorites



📊 Match Details (Enhanced)

\- Real team logos and badges

\- Match information (date, time, venue)

\- Stadium details with capacity

\- Head-to-head statistics

\- Match preview and descriptions

\- Quick facts section



👤 Profile

\- User information display

\- Statistics dashboard (Favorites, Leagues, Teams)

\- Settings and preferences

\- Notifications management

\- Help \& Support

\- About section


🛠️ Technologies Used



\- "React Native" - Cross-platform mobile development

\- "Expo" - Development and build tooling

\- "React Navigation" - Navigation management (Stack \& Bottom Tabs)

\- "Redux Toolkit" - State management

\- "AsyncStorage" - Local data persistence

\- "Axios" - HTTP requests

\- "TheSportsDB API" - Sports data

\- "Expo Linear Gradient" - Beautiful UI gradients

\- "Feather Icons" - Consistent iconography



📦 Installation



Prerequisites

\- Node.js (v14 or higher)

\- npm or yarn

\- Expo Go app (for testing on physical device)



Steps



1\. Clone the repository

```bash

git clone https://github.com/RDHMRambandara/MatchDay-Sports-App.git

cd MatchDay-Sports-App

```



2\. Install dependencies

```bash

npm install

```



3\. Start the development server

```bash

npx expo start

```



4\. Run on your device

\- Install "Expo Go" from Play Store (Android) or App Store (iOS)

\- Scan the QR code shown in terminal

\- App will load on your device



📁 Project Structure

```

MatchDay/

├── src/

│   ├── components/        # Reusable components

│   ├── navigation/        # Navigation configuration

│   │   └── AppNavigator.js

│   ├── redux/            # State management

│   │   ├── store.js

│   │   ├── authSlice.js

│   │   ├── matchesSlice.js

│   │   ├── favoritesSlice.js

│   │   └── playersSlice.js

│   ├── screens/          # App screens

│   │   ├── LoginScreen.js

│   │   ├── RegisterScreen.js

│   │   ├── HomeScreen.js

│   │   ├── PlayersScreen.js

│   │   ├── MatchDetailsScreen.js

│   │   ├── FavoritesScreen.js

│   │   └── ProfileScreen.js

│   ├── services/         # API services

│   │   └── api.js

│   └── utils/           # Utility functions

│       └── storage.js

├── assets/              # Images and fonts

├── App.js              # Entry point

├── package.json        # Dependencies

└── README.md          # Documentation

```



🎨 Design Highlights



\- "Modern UI/UX" - Clean, intuitive interface with smooth transitions

\- "Dark Theme" - Eye-friendly dark blue gradient theme

\- "Responsive Design" - Works seamlessly on various screen sizes

\- "Real Data" - Live sports data from TheSportsDB API

\- "Professional Icons" - Feather Icons throughout the app

\- "Image Optimization" - Efficient loading of team logos and player photos



🔑 Key Features Implementation



State Management (Redux Toolkit)

```javascript

// Centralized state management for:

\- Authentication state

\- Matches data

\- Favorites list

\- Players data

```



Data Persistence

```javascript

// AsyncStorage for:

\- Favorite matches

\- User preferences

\- Authentication tokens

```



API Integration

```javascript

// TheSportsDB API endpoints:

\- Upcoming matches

\- Player profiles

\- Team details

\- Match information

```



📝 Assignment Requirements Met



✅ "User Authentication" - Login/Register with validation  

✅ "Navigation" - Stack \& Bottom Tab navigation  

✅ "API Integration" - TheSportsDB API for live data  

✅ "State Management" - Redux Toolkit implementation  

✅ "Favorites" - Persistent favorites with AsyncStorage  

✅ "Styling" - Consistent, responsive UI with Feather Icons  

✅ "Code Quality" - Clean, modular, well-structured code  

✅ "Bonus Feature" - Dark mode theme



🚀 Future Enhancements



\- \[ ] Live match scores

\- \[ ] Push notifications for favorite teams

\- \[ ] Social sharing features

\- \[ ] Match predictions

\- \[ ] League standings

\- \[ ] Player comparison tool

\- \[ ] Offline mode



📄 License



This project is licensed under the MIT License.



👨‍💻 Developer



"R.D.H.M. Rambandara"  

Index Number: 224159X  

Course: IN3210 Mobile Applications Development  

Institution: University of Moratuwa



🙏 Acknowledgments



\- \[TheSportsDB](https://www.thesportsdb.com/) - Sports data API

\- \[Expo](https://expo.dev/) - Development platform

\- \[React Native](https://reactnative.dev/) - Framework

\- \[Unsplash](https://unsplash.com/) - Beautiful stock images



📧 Contact



For any queries or feedback:

\- Email: rdhmrambandara@gmail.com

\- GitHub: \[@RDHMRambandara](https://github.com/RDHMRambandara)



---



<div align="center">

&nbsp; Made with ❤️ and React Native

</div>

