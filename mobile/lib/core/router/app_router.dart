import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../features/auth/presentation/login_page.dart';
import '../../features/auth/presentation/register_page.dart';
import '../../features/chat/presentation/chat_page.dart';
import '../../features/marketplace/presentation/marketplace_page.dart';
import '../../features/notifications/presentation/notification_permission_page.dart';
import '../../features/profile/presentation/profile_page.dart';
import '../../features/sessions/presentation/sessions_page.dart';
import '../../features/swaps/presentation/swaps_page.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/login',
    routes: [
      GoRoute(path: '/login', builder: (_, __) => const LoginPage()),
      GoRoute(path: '/register', builder: (_, __) => const RegisterPage()),
      GoRoute(path: '/home', builder: (_, __) => const HomeShell()),
      GoRoute(path: '/profile', builder: (_, __) => const ProfilePage()),
      GoRoute(path: '/notifications', builder: (_, __) => const NotificationPermissionPage()),
      GoRoute(
        path: '/chat',
        builder: (_, state) => ChatPage(swapId: state.extra as String),
      ),
    ],
  );
});

class HomeShell extends StatefulWidget {
  const HomeShell({super.key});

  @override
  State<HomeShell> createState() => _HomeShellState();
}

class _HomeShellState extends State<HomeShell> {
  int idx = 0;
  final tabs = const [MarketplacePage(), SwapsPage(), SessionsPage(), ProfilePage()];

  @override
  Widget build(BuildContext context) => Scaffold(
        body: tabs[idx],
        bottomNavigationBar: NavigationBar(
          selectedIndex: idx,
          onDestinationSelected: (v) => setState(() => idx = v),
          destinations: const [
            NavigationDestination(icon: Icon(Icons.home), label: 'Feed'),
            NavigationDestination(icon: Icon(Icons.swap_horiz), label: 'Swaps'),
            NavigationDestination(icon: Icon(Icons.schedule), label: 'Sessions'),
            NavigationDestination(icon: Icon(Icons.person), label: 'Profile'),
          ],
        ),
      );
}
