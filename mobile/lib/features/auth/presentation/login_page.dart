import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/widgets/primary_button.dart';
import 'auth_controller.dart';

class LoginPage extends ConsumerStatefulWidget {
  const LoginPage({super.key});

  @override
  ConsumerState<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends ConsumerState<LoginPage> {
  final email = TextEditingController(text: 'demo1@student.edu');
  final password = TextEditingController(text: 'password123');

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Login')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(children: [
          TextField(controller: email, decoration: const InputDecoration(labelText: 'Email')),
          const SizedBox(height: 12),
          TextField(controller: password, obscureText: true, decoration: const InputDecoration(labelText: 'Password')),
          const SizedBox(height: 16),
          PrimaryButton(
            text: 'Login',
            onPressed: () async {
              await ref.read(authControllerProvider.notifier).login(email.text, password.text);
              if (mounted) Navigator.pushReplacementNamed(context, '/home');
            },
          ),
          TextButton(onPressed: () => Navigator.pushNamed(context, '/register'), child: const Text('Create account'))
        ]),
      ),
    );
  }
}
