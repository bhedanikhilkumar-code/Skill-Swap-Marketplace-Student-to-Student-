import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../domain/auth_state.dart';
import '../data/auth_repository.dart';

final authControllerProvider = StateNotifierProvider<AuthController, AuthState>((ref) => AuthController(ref));

class AuthController extends StateNotifier<AuthState> {
  final Ref ref;
  AuthController(this.ref) : super(const AuthState());

  Future<void> login(String email, String password) async {
    state = state.copyWith(loading: true);
    final userId = await ref.read(authRepositoryProvider).login(email, password);
    state = AuthState(userId: userId, loading: false);
  }

  Future<void> register(String name, String email, String password) => ref.read(authRepositoryProvider).register(name, email, password);

  Future<void> logout() async {
    await ref.read(authRepositoryProvider).logout();
    state = const AuthState();
  }
}
