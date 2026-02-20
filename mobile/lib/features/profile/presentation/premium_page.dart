import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/profile_repository.dart';

class PremiumPage extends ConsumerWidget {
  const PremiumPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final me = ref.watch(meProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Premium')),
      body: me.when(
        data: (u) => Padding(
          padding: const EdgeInsets.all(16),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text('Premium: ${u['isPremium'] == true ? 'Active' : 'Inactive'}'),
            Text('Boost credits: ${u['boostCredits'] ?? 0}'),
            Text('Boosted until: ${u['boostedUntil'] ?? '-'}'),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: () async {
                await ref.read(profileRepositoryProvider).boostProfile();
                ref.invalidate(meProvider);
              },
              child: const Text('Boost my profile'),
            )
          ]),
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text(e.toString())),
      ),
    );
  }
}
