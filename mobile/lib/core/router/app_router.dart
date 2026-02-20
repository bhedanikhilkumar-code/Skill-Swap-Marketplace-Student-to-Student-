import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../features/admin/presentation/admin_page.dart';
import '../../features/auth/presentation/auth_controller.dart';
import '../../features/auth/presentation/login_page.dart';
import '../../features/auth/presentation/register_page.dart';
import '../../features/bundles/presentation/bundles_page.dart';
import '../../features/calls/presentation/call_page.dart';
import '../../features/chat/presentation/chat_page.dart';
import '../../features/communities/presentation/communities_page.dart';
import '../../features/marketplace/presentation/marketplace_page.dart';
import '../../features/notifications/presentation/notification_permission_page.dart';
import '../../features/profile/presentation/premium_page.dart';
import '../../features/profile/presentation/profile_page.dart';
import '../../features/profile/presentation/verification_page.dart';
import '../../features/referrals/presentation/referrals_page.dart';
import '../../features/sessions/presentation/sessions_page.dart';
import '../../features/swaps/presentation/swaps_page.dart';
import '../../features/wallet/presentation/wallet_page.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/login',
    routes: [
      GoRoute(path: '/login', builder: (_, __) => const LoginPage()),
      GoRoute(path: '/register', builder: (_, __) => const RegisterPage()),
      GoRoute(path: '/home', builder: (_, __) => const HomeShell()),
      GoRoute(path: '/profile', builder: (_, __) => const ProfilePage()),
      GoRoute(path: '/verification', builder: (_, __) => const VerificationPage()),
      GoRoute(path: '/premium', builder: (_, __) => const PremiumPage()),
      GoRoute(path: '/wallet', builder: (_, __) => const WalletPage()),
      GoRoute(path: '/referrals', builder: (_, __) => const ReferralsPage()),
      GoRoute(path: '/bundles', builder: (_, __) => const BundlesPage()),
      GoRoute(path: '/communities', builder: (_, __) => const CommunitiesPage()),
      GoRoute(path: '/notifications', builder: (_, __) => const NotificationPermissionPage()),
      GoRoute(path: '/admin', builder: (_, __) => const AdminPage()),
      GoRoute(path: '/chat', builder: (_, state) => ChatPage(swapId: state.extra as String)),
      GoRoute(path: '/call', builder: (_, state) => CallPage(sessionId: state.extra as String)),
      GoRoute(path: '/notifications', builder: (_, __) => const NotificationPermissionPage()),
      GoRoute(path: '/admin', builder: (_, __) => const AdminPage()),
      GoRoute(
        path: '/chat',
        builder: (_, state) => ChatPage(swapId: state.extra as String),
      ),
    ],
  );
});

class HomeShell extends ConsumerStatefulWidget {
  const HomeShell({super.key});

  @override
  ConsumerState<HomeShell> createState() => _HomeShellState();
}

class _HomeShellState extends ConsumerState<HomeShell> {
  int idx = 0;

  @override
  Widget build(BuildContext context) {
    final auth = ref.watch(authControllerProvider);
    final tabs = [
      const MarketplacePage(),
      const CommunitiesPage(),
      const BundlesPage(),
      const SwapsPage(),
      const SessionsPage(),
      const ProfilePage(),
      if (auth.isAdmin) const AdminPage()
    ];
    final tabs = [const MarketplacePage(), const SwapsPage(), const SessionsPage(), const ProfilePage(), if (auth.isAdmin) const AdminPage()];

    return Scaffold(
      body: tabs[idx],
      bottomNavigationBar: NavigationBar(
        selectedIndex: idx,
        onDestinationSelected: (v) => setState(() => idx = v),
        destinations: [
          const NavigationDestination(icon: Icon(Icons.home), label: 'Feed'),
          const NavigationDestination(icon: Icon(Icons.groups), label: 'Communities'),
          const NavigationDestination(icon: Icon(Icons.view_list), label: 'Bundles'),
          const NavigationDestination(icon: Icon(Icons.swap_horiz), label: 'Swaps'),
          const NavigationDestination(icon: Icon(Icons.schedule), label: 'Sessions'),
          const NavigationDestination(icon: Icon(Icons.person), label: 'Profile'),
          if (auth.isAdmin) const NavigationDestination(icon: Icon(Icons.admin_panel_settings), label: 'Admin'),
        ],
      ),
    );
  }
}
