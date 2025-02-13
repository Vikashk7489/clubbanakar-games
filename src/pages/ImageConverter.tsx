
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Download, Image as ImageIcon } from "lucide-react";

const ImageConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [format, setFormat] = useState<string>("png");
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      setConvertedImage(null);
    }
  };

  const convertImage = async () => {
    if (!selectedFile) return;

    try {
      const image = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = URL.createObjectURL(selectedFile);
      });

      canvas.width = image.width;
      canvas.height = image.height;
      ctx?.drawImage(image, 0, 0);

      const convertedDataUrl = canvas.toDataURL(`image/${format}`);
      setConvertedImage(convertedDataUrl);
      
      toast({
        title: "Success!",
        description: "Image converted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert image",
        variant: "destructive",
      });
    }
  };

  const downloadImage = () => {
    if (!convertedImage) return;

    const link = document.createElement("a");
    link.href = convertedImage;
    link.download = `converted-image.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen w-full py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Image Converter</h1>
        
        <Card className="max-w-2xl mx-auto p-6">
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
              <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="max-w-xs"
              />
            </div>

            {selectedFile && (
              <div className="space-y-4">
                <div className="flex gap-4 items-center justify-center">
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="px-4 py-2 border rounded-md"
                  >
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="webp">WEBP</option>
                  </select>
                  <Button onClick={convertImage}>
                    <Upload className="w-4 h-4 mr-2" />
                    Convert
                  </Button>
                </div>

                {convertedImage && (
                  <div className="flex flex-col items-center gap-4">
                    <img
                      src={convertedImage}
                      alt="Converted"
                      className="max-w-full h-auto rounded-lg"
                    />
                    <Button onClick={downloadImage}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ImageConverter;
