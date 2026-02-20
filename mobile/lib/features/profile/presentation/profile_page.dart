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
          child: ListView(children: [
            Row(children: [
              Text(u['name'] ?? '', style: Theme.of(context).textTheme.headlineSmall),
              if (u['isVerified'] == true) const Padding(padding: EdgeInsets.only(left: 6), child: Icon(Icons.verified, color: Colors.blue)),
              if (u['isPremium'] == true) const Padding(padding: EdgeInsets.only(left: 6), child: Icon(Icons.workspace_premium, color: Colors.amber)),
            ]),
            Text('${u['college'] ?? ''} • Year ${u['year'] ?? ''}'),
            const SizedBox(height: 8),
            Text(u['bio'] ?? ''),
            const SizedBox(height: 12),
            Text('No-show strikes: ${u['noShowStrikes'] ?? 0}'),
            Text('Cooldown until: ${u['cooldownUntil'] ?? '-'}'),
            const SizedBox(height: 12),
            const Text('Skills Offered'),
            Wrap(
              spacing: 8,
              children: (u['skillsOffered'] as List? ?? [])
                  .map((e) => SkillChip(label: '${e['name'] ?? e.toString()} (${e['level'] ?? ''})'))
                  .toList(),
            ),
            const SizedBox(height: 8),
            const Text('Skills Wanted'),
            Wrap(
              spacing: 8,
              children: (u['skillsWanted'] as List? ?? [])
                  .map((e) => SkillChip(label: '${e['name'] ?? e.toString()} (${e['levelWanted'] ?? ''})'))
                  .toList(),
            ),
            const SizedBox(height: 8),
            const Text('Portfolio'),
            ...(u['portfolioLinks'] as List? ?? []).map((e) => ListTile(title: Text(e['type'] ?? 'OTHER'), subtitle: Text(e['url'] ?? ''))),
            const SizedBox(height: 12),
            ElevatedButton(onPressed: () => Navigator.pushNamed(context, '/verification'), child: const Text('Verification')),
            ElevatedButton(onPressed: () => Navigator.pushNamed(context, '/premium'), child: const Text('Premium')),
          ]),
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text(e.toString())),
      ),
    );
  }
}
