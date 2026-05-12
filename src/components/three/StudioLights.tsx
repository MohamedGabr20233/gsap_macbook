import { Environment, Lightformer } from "@react-three/drei";

const StudioLights = () => {
  return (
    /* to make that element useable inside Canvas we
     * 1) need to wrap it with group tag and use the dispose={null} to prevent memory leaks
     * 2) need to use Environment Tag from drei
     * 3) we can use the LightFormer tag to create custom light
     */
    <group name="lights">
      <Environment resolution={256}>
        <group>
          {/* apple usually use this to create lighting for products edges without hashing the product shadows   */}
          <Lightformer form="rect" intensity={10} position={[-10, 5, 5]} scale={10} />

          <Lightformer form="rect" intensity={10} position={[10, 0, 1]} scale={10} />
        </group>
      </Environment>
      <spotLight position={[-2, 10, 5]} angle={0.15} intensity={Math.PI * 0.2} decay={0} />
      <spotLight position={[0, -25, 10]} angle={0.15} intensity={Math.PI * 0.2} decay={0} />
      <spotLight position={[0, 15, 5]} angle={0.15} intensity={Math.PI * 1} decay={0.1} />
    </group>
  );
};

export default StudioLights;
