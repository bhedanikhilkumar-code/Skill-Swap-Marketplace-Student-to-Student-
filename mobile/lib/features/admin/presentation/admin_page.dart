import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/api_client.dart';

final reportsProvider = FutureProvider((ref) async {
  final c = await ApiClient.create();
  final res = await c.dio.get('/admin/reports', queryParameters: {'page': 1, 'limit': 20});
  return (res.data['data']['items'] as List).cast<Map<String, dynamic>>();
});

class AdminPage extends ConsumerWidget {
  const AdminPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final reports = ref.watch(reportsProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Admin')),
      body: reports.when(
        data: (items) => ListView.builder(
          itemCount: items.length,
          itemBuilder: (_, i) {
            final report = items[i];
            final userId = report['reportedUserId']?['_id']?.toString() ?? '';
            return Card(
              child: ListTile(
                title: Text(report['reason']?.toString() ?? 'Report'),
                subtitle: Text('User: $userId'),
                trailing: PopupMenuButton<String>(
                  onSelected: (action) async {
                    final c = await ApiClient.create();
                    await c.dio.patch('/admin/users/$userId/$action', data: {'reason': 'Admin moderation action'});
                    ref.invalidate(reportsProvider);
                  },
                  itemBuilder: (_) => const [
                    PopupMenuItem(value: 'warn', child: Text('Warn')),
                    PopupMenuItem(value: 'ban', child: Text('Ban')),
                    PopupMenuItem(value: 'shadowban', child: Text('Shadowban')),
                  ],
                ),
              ),
            );
          },
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text(e.toString())),
      ),
    );
  }
}
