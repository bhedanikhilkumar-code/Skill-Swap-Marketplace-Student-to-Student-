import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/api_client.dart';

final swapsRepositoryProvider = Provider((ref) => SwapsRepository());

class SwapsRepository {
  Future<List<dynamic>> inbox() async {
    final c = await ApiClient.create();
    final res = await c.dio.get('/swaps/inbox');
    return res.data['data'];
  }

  Future<List<dynamic>> sent() async {
    final c = await ApiClient.create();
    final res = await c.dio.get('/swaps/sent');
    return res.data['data'];
  }

  Future<void> requestSwap(Map<String, dynamic> body) async {
    final c = await ApiClient.create();
    await c.dio.post('/swaps', data: body);
  }
}
