import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/api_client.dart';

final safetyRepositoryProvider = Provider((ref) => SafetyRepository());

class SafetyRepository {
  Future<void> report(String userId, String reason) async {
    final c = await ApiClient.create();
    await c.dio.post('/reports', data: {'reportedUserId': userId, 'reason': reason});
  }

  Future<void> block(String userId) async {
    final c = await ApiClient.create();
    await c.dio.post('/blocks', data: {'userId': userId});
  }
}
