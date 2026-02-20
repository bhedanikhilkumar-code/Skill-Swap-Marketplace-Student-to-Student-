import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/socket_client.dart';
import '../../auth/presentation/auth_controller.dart';
import '../data/chat_repository.dart';

final socketProvider = Provider((ref) => SocketClient()..connect());

class ChatPage extends ConsumerStatefulWidget {
  final String swapId;
  const ChatPage({super.key, required this.swapId});
  @override
  ConsumerState<ChatPage> createState() => _ChatPageState();
}

class _ChatPageState extends ConsumerState<ChatPage> {
  final input = TextEditingController();
  List<dynamic> messages = [];

  @override
  void initState() {
    super.initState();
    _init();
  }

  Future<void> _init() async {
    messages = await ref.read(chatRepositoryProvider).history(widget.swapId);
    final socket = ref.read(socketProvider).socket;
    final userId = ref.read(authControllerProvider).userId;
    socket?.emit('join-swap', {'swapId': widget.swapId, 'userId': userId});
    socket?.on('new-message', (m) => setState(() => messages.add(m)));
    setState(() {});
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text('Swap Chat')),
        body: Column(children: [
          Expanded(
              child: ListView(children: messages.map((m) => ListTile(title: Text(m['text']))).toList())),
          Padding(
            padding: const EdgeInsets.all(8),
            child: Row(children: [
              Expanded(child: TextField(controller: input)),
              IconButton(
                  onPressed: () {
                    final userId = ref.read(authControllerProvider).userId;
                    ref.read(socketProvider).socket?.emit('send-message', {'swapId': widget.swapId, 'senderId': userId, 'text': input.text});
                    input.clear();
                  },
                  icon: const Icon(Icons.send))
            ]),
          )
        ]),
      );
}
