# CINEVO Remote for iPhone and iPad

Current as of iOS 17 and later, including iOS 18 and iOS 26. Open `CINEVORemote.xcodeproj` in Xcode 16 or newer.

1. Select the CINEVORemote target and set your Team. A free Apple ID can install it on your own phone for a week.
2. Plug in the iPhone and press Run.
3. Enter the house address. The app opens `/remote`. Playback stays on the house.

There is no App Store build here. Apple will not install an unsigned app. On the phone itself, download `CINEVO.mobileconfig` from your house and install the profile. That puts the same remote on the Home Screen without Xcode.

A house opened at `localhost` cannot be reached by the phone. Use the address on your network.
