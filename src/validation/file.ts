export const validateFiles = (files: FileList) : Promise<{ error: boolean, message?: string }> => {
    return new Promise(resolve => {
      const regexSpecialCharacter = /[#$%^~{}+|\]\\[]|\\.\\.|^\\.|\\.$/g;

      for (const [, file] of Object.entries(files)) {
          if(regexSpecialCharacter.test(file.name)) {
              return resolve({
                  error: true,
                  message: 'Tên file có chứa ký tự đặc biệt #$%^~{}+|'
              });
          }
      }

      resolve({ error: false })
    })
}
