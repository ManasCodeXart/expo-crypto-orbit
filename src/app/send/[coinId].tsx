import { useLocalSearchParams } from 'expo-router'
import { Image, StyleSheet, Text, View } from 'react-native'

import { DEFAULT_COINS } from '../../constants/defaultCoins'

export default function SendScreen() {
  const { coinId } = useLocalSearchParams<{ coinId: string }>()
  const coin = DEFAULT_COINS.find((candidate) => candidate.id === coinId)

  if (!coin) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Coin not found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Image source={coin.icon} style={styles.icon} resizeMode="contain" />
      <Text style={styles.title}>Send {coin.name}</Text>
      <Text style={[styles.symbol, { color: coin.glowColor }]}>{coin.symbol}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#ffffff', fontSize: 24, fontWeight: '700' },
  icon: { width: 64, height: 64, marginBottom: 16 },
  symbol: { fontSize: 16, fontWeight: '600', marginTop: 8 },
})