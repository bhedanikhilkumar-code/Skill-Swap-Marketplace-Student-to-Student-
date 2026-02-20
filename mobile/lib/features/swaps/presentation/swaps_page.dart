import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/swaps_repository.dart';

final inboxProvider = FutureProvider((ref) => ref.read(swapsRepositoryProvider).inbox());

class SwapsPage extends ConsumerWidget {
  const SwapsPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final data = ref.watch(inboxProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Swap Inbox')),
      body: data.when(
        data: (swaps) => ListView.builder(
          itemCount: swaps.length,
          itemBuilder: (_, i) {
            final s = swaps[i];
            return ListTile(
              title: Text('${s['offeredSkill']} ↔ ${s['requestedSkill']}'),
              subtitle: Text('Status: ${s['status']}'),
              onTap: () => Navigator.pushNamed(context, '/chat', arguments: s['_id']),
            );
          },
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text(e.toString())),
      ),
    );
  }
}
