import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import '../constants/app_constants.dart';
import '../storage/secure_storage.dart';

class ApiClient {
  final Dio dio;
  ApiClient._(this.dio);

  static Future<ApiClient> create() async {
    final dio = Dio(BaseOptions(baseUrl: dotenv.env['API_BASE_URL']!));
    dio.interceptors.add(InterceptorsWrapper(onRequest: (options, handler) async {
      final token = await secureStorage.read(key: AppConstants.tokenKey);
      if (token != null) options.headers['Authorization'] = 'Bearer $token';
      handler.next(options);
    }));
    return ApiClient._(dio);
  }
}
