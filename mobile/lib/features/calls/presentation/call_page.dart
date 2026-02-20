import 'package:flutter/material.dart';

class CallPage extends StatelessWidget {
  final String sessionId;
  const CallPage({super.key, required this.sessionId});

  @override
  Widget build(BuildContext context) => Scaffold(appBar: AppBar(title: const Text('Call')), body: Center(child: Text('Session: $sessionId')));
}
