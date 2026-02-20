import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/widgets/user_card.dart';
import '../data/marketplace_repository.dart';

final feedProvider = FutureProvider((ref) => ref.read(marketplaceRepositoryProvider).fetchUsers());

class MarketplacePage extends ConsumerWidget {
  const MarketplacePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final feed = ref.watch(feedProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Marketplace')),
      body: feed.when(
        data: (users) => ListView.builder(
          itemCount: users.length,
          itemBuilder: (_, i) => UserCard(
            user: users[i],
            onTap: () => Navigator.pushNamed(context, '/profile', arguments: users[i].id),
          ),
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text(e.toString())),
      ),
    );
  }
}
