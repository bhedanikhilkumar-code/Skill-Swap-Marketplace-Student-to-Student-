import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/api_client.dart';

final sessionsRepositoryProvider = Provider((ref) => SessionsRepository());

class SessionsRepository {
  Future<List<dynamic>> upcoming() async {
    final c = await ApiClient.create();
    final res = await c.dio.get('/sessions/upcoming');
    return res.data['data'];
  }

  Future<void> markAttendance(String sessionId, String outcome) async {
    final c = await ApiClient.create();
    await c.dio.patch('/sessions/$sessionId/attendance', data: {'outcome': outcome});
  }
}
