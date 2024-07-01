

namespace App {

  interface ILeftbarItem {
    classnames: string | string[];
    icon: string;
    text: string;
    event: () => void;
  }
}



export default App;