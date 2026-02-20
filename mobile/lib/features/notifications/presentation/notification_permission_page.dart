import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import '../../../core/network/api_client.dart';
import '../../../core/widgets/primary_button.dart';

class NotificationPermissionPage extends StatelessWidget {
  const NotificationPermissionPage({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text('Notifications')),
        body: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(children: [
            const Text('Enable notifications for swap alerts and session reminders.'),
            const SizedBox(height: 16),
            PrimaryButton(
                text: 'Enable',
                onPressed: () async {
                  await FirebaseMessaging.instance.requestPermission();
                  final token = await FirebaseMessaging.instance.getToken();
                  if (token != null) {
                    final c = await ApiClient.create();
                    await c.dio.post('/notifications/token', data: {'token': token});
                  }
                  if (context.mounted) ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Notification setup complete')));
                })
          ]),
        ),
      );
}
