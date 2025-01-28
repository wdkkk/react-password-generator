import { ISettingsParameter } from "../types"

function getRandomSymbolType(arr: string[][]):string[] {
  return arr[ Math.floor((Math.random() * arr.length)) ];
}
function getRandomSymbol(arr: string[]):string {
  return arr[ Math.floor((Math.random() * arr.length)) ];
}

export const generatePasswords = (settingsData: ISettingsParameter[], passwordSize: number): string[] | null => {
  const numbers = Array.from('0123456789')
  const smallLetters = Array.from('abcdefghijklmnopqrstuvwxyz')
  const bigLetters = Array.from('abcdefghijklmnopqrstuvwxyz'.toUpperCase())
  const specialSymbols = Array.from('!#$%&()*+,-./:;<=>?@[]^_`{|}~')

  const passwords:string[] = []

  const allSymbols = [numbers, smallLetters, bigLetters, specialSymbols]
  const allowedSymbols:string[][] = []

  settingsData.map((settings): boolean => {
    if (settings.use) {
      allowedSymbols.push( allSymbols[settings.index] )
      return true
    }
    else return false;
  })

  if (allowedSymbols.length === 0) return null

  for (let i = 0; i < 5; i++) {
    let password = ''
    for (let i = 0; i < passwordSize; i++) {
      const symbolType = getRandomSymbolType(allowedSymbols)
      const symbol = getRandomSymbol(symbolType)
  
      password += symbol
    }

    passwords.push(password)
  }

  return passwords
}