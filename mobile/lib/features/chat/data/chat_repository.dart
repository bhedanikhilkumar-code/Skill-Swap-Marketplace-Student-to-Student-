import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/api_client.dart';

final chatRepositoryProvider = Provider((ref) => ChatRepository());

class ChatRepository {
  Future<List<dynamic>> history(String swapId) async {
    final c = await ApiClient.create();
    final res = await c.dio.get('/chats/$swapId/messages');
    return res.data['data'];
  }
}
