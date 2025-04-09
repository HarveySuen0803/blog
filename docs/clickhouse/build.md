```cpp
mkdir -p build && cd build

cmake .. \
    -G Ninja \
    -DCMAKE_BUILD_TYPE=Debug \
    -DCMAKE_C_COMPILER=/usr/bin/clang-18 \
    -DCMAKE_CXX_COMPILER=/usr/bin/clang++-18 \
    -DCMAKE_LINKER=/usr/bin/ld.lld-18 \
    -DNO_ARMV81_OR_HIGHER=1 \
    -DCMAKE_CXX_COMPILER_LAUNCHER=ccache \
    -DCMAKE_C_COMPILER_LAUNCHER=ccache \
    -DENABLE_TESTS=OFF \
    -DENABLE_EXAMPLES=OFF \
    -DENABLE_BENCHMARKS=OFF \
    -DENABLE_JEMALLOC=ON \
    -DENABLE_RDKAFKA=OFF \
    -DCONFIG_XML_PATH=$(pwd)/../config.xml \
    -DCMAKE_INSTALL_PREFIX=$(pwd)/../install

ninja -j8 clickhouse
```

```cpp
./build/programs/clickhouse server --config-file=./config.xml
```

```cpp
./build/programs/clickhouse client --host=localhost --port=9000
```

