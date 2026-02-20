import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/profile_repository.dart';

final verificationProvider = FutureProvider((ref) => ref.read(profileRepositoryProvider).getVerification());

class VerificationPage extends ConsumerStatefulWidget {
  const VerificationPage({super.key});

  @override
  ConsumerState<VerificationPage> createState() => _VerificationPageState();
}

class _VerificationPageState extends ConsumerState<VerificationPage> {
  final emailCtrl = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(verificationProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Verification')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            state.when(
              data: (v) => Chip(label: Text('Status: ${v['verificationStatus'] ?? 'NONE'}')),
              loading: () => const CircularProgressIndicator(),
              error: (e, _) => Text(e.toString()),
            ),
            TextField(controller: emailCtrl, decoration: const InputDecoration(labelText: 'College email')),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: () async {
                await ref.read(profileRepositoryProvider).requestVerification(collegeEmail: emailCtrl.text);
                ref.invalidate(verificationProvider);
              },
              child: const Text('Submit verification request'),
            )
          ],
        ),
      ),
    );
  }
}
