import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:socket_io_client/socket_io_client.dart' as io;

class SocketClient {
  io.Socket? socket;

  void connect() {
    socket = io.io(dotenv.env['SOCKET_BASE_URL']!, io.OptionBuilder().setTransports(['websocket']).disableAutoConnect().build());
    socket?.connect();
  }

  void disconnect() => socket?.disconnect();
}
