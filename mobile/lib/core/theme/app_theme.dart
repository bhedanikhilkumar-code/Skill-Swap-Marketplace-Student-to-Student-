import 'package:flutter/material.dart';

class AppTheme {
  static final light = ThemeData(
    colorSchemeSeed: Colors.indigo,
    useMaterial3: true,
    cardTheme: CardTheme(color: Colors.white, elevation: 2, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14))),
    inputDecorationTheme: const InputDecorationTheme(border: OutlineInputBorder()),
  );
}
