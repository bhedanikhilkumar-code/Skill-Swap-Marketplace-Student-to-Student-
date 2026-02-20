import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/api_client.dart';

final profileRepositoryProvider = Provider((ref) => ProfileRepository());

class ProfileRepository {
  Future<Map<String, dynamic>> me() async {
    final c = await ApiClient.create();
    final res = await c.dio.get('/users/me');
    return res.data['data'];
  }

  Future<void> update(Map<String, dynamic> body) async {
    final c = await ApiClient.create();
    await c.dio.patch('/users/me', data: body);
  }
}
