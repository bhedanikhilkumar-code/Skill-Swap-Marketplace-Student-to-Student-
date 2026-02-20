import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/constants/app_constants.dart';
import '../../../core/storage/secure_storage.dart';
import '../../../core/network/api_client.dart';

final authRepositoryProvider = Provider<AuthRepository>((ref) => AuthRepository());

class AuthRepository {
  Future<void> register(String name, String email, String password) async {
    final client = await ApiClient.create();
    await client.dio.post('/auth/register', data: {'name': name, 'email': email, 'password': password});
  }

  Future<String> login(String email, String password) async {
    final client = await ApiClient.create();
    final res = await client.dio.post('/auth/login', data: {'email': email, 'password': password});
    final data = res.data['data'];
    await secureStorage.write(key: AppConstants.tokenKey, value: data['accessToken']);
    await secureStorage.write(key: AppConstants.refreshTokenKey, value: data['refreshToken']);
    return data['userId'];
  }

  Future<void> logout() async {
    await secureStorage.deleteAll();
  }
}
