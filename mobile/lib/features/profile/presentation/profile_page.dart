import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/widgets/skill_chip.dart';
import '../data/profile_repository.dart';

final meProvider = FutureProvider((ref) => ref.read(profileRepositoryProvider).me());

class ProfilePage extends ConsumerWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final me = ref.watch(meProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('My Profile')),
      body: me.when(
        data: (u) => Padding(
          padding: const EdgeInsets.all(16),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(u['name'] ?? '', style: Theme.of(context).textTheme.headlineSmall),
            Text('${u['college'] ?? ''} • Year ${u['year'] ?? ''}'),
            const SizedBox(height: 8),
            Text(u['bio'] ?? ''),
            const SizedBox(height: 12),
            Wrap(spacing: 8, children: (u['skillsOffered'] as List? ?? []).map((e) => SkillChip(label: e.toString())).toList())
          ]),
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text(e.toString())),
      ),
    );
  }
}
