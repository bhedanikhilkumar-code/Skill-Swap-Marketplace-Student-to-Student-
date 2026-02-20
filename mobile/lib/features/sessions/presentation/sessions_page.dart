import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/sessions_repository.dart';

final sessionsProvider = FutureProvider((ref) => ref.read(sessionsRepositoryProvider).upcoming());

class SessionsPage extends ConsumerWidget {
  const SessionsPage({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final sessions = ref.watch(sessionsProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Upcoming Sessions')),
      body: sessions.when(
        data: (list) => ListView(children: list.map((s) => ListTile(title: Text(s['mode']), subtitle: Text(s['scheduledAt']))).toList()),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text(e.toString())),
      ),
    );
  }
}
