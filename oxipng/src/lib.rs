use oxipng::Interlacing;
#[cfg(feature = "parallel")]
pub use wasm_bindgen_rayon::init_thread_pool;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn optimize(data: &[u8], level: u8, interlace: bool) -> Vec<u8> {
    let mut options = oxipng::Options::from_preset(level);
    options.fix_errors = true;
    options.interlace = Some(if interlace {
        Interlacing::Adam7
    } else {
        Interlacing::None
    });

    oxipng::optimize_from_memory(data, &options).unwrap_throw()
}
