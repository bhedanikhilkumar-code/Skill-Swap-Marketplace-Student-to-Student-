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
        data: (list) => ListView(
          children: list
              .map(
                (s) => Card(
                  child: ListTile(
                    title: Text('${s['mode']} • ${s['status']}'),
                    subtitle: Text(s['scheduledAt'].toString()),
                    isThreeLine: true,
                    trailing: Wrap(
                      spacing: 4,
                      children: [
                        IconButton(
                            onPressed: () async {
                              await ref.read(sessionsRepositoryProvider).markAttendance(s['_id'], 'COMPLETED');
                              ref.invalidate(sessionsProvider);
                            },
                            icon: const Icon(Icons.check_circle, color: Colors.green)),
                        IconButton(
                            onPressed: () async {
                              await ref.read(sessionsRepositoryProvider).markAttendance(s['_id'], 'NO_SHOW_OTHER');
                              ref.invalidate(sessionsProvider);
                            },
                            icon: const Icon(Icons.report, color: Colors.orange)),
                        IconButton(
                            onPressed: () async {
                              await ref.read(sessionsRepositoryProvider).markAttendance(s['_id'], 'CANCELLED');
                              ref.invalidate(sessionsProvider);
                            },
                            icon: const Icon(Icons.cancel, color: Colors.red)),
                      ],
                    ),
                  ),
                ),
              )
              .toList(),
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text(e.toString())),
      ),
    );
  }
}
