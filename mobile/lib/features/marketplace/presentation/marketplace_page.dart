import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/widgets/user_card.dart';
import '../data/marketplace_repository.dart';

final recommendedFeedProvider = FutureProvider((ref) => ref.read(marketplaceRepositoryProvider).fetchRecommended());
final collegeFeedProvider = FutureProvider((ref) => ref.read(marketplaceRepositoryProvider).fetchUsers(college: 'MIT'));

class MarketplacePage extends ConsumerWidget {
  const MarketplacePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(title: const Text('Marketplace'), bottom: const TabBar(tabs: [Tab(text: 'Recommended'), Tab(text: 'Nearby/College')])),
        body: TabBarView(
          children: [
            _FeedBody(provider: recommendedFeedProvider),
            _FeedBody(provider: collegeFeedProvider),
          ],
        ),
      ),
    );
  }
}

class _FeedBody extends ConsumerWidget {
  final AutoDisposeFutureProvider provider;
  const _FeedBody({required this.provider});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final feed = ref.watch(provider);
    return feed.when(
      data: (users) => ListView.builder(
        itemCount: users.length,
        itemBuilder: (_, i) => UserCard(
          user: users[i],
          onTap: () => Navigator.pushNamed(context, '/profile', arguments: users[i].id),
        ),
      ),
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (e, _) => Center(child: Text(e.toString())),
    );
  }
}
